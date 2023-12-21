package main

import (
	dictionary "Dictionnaire/dictionnary"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
)

func main() {
	dict := dictionary.NewDictionary("C:/Users/ASUS/Desktop/Dictionnaire/dictionnaire/dictionary.json")
	defer dict.Close()
	addChannel := make(chan struct {
		Word       string `json:"word"`
		Definition string `json:"definition"`
	})
	var wg sync.WaitGroup
	go func() {
		for request := range addChannel {
			dict.Add(request.Word, request.Definition)
			wg.Done()
		}
	}()

	http.HandleFunc("/add", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			body, err := ioutil.ReadAll(r.Body)
			if err != nil {
				http.Error(w, "Error reading request body", http.StatusInternalServerError)
				return
			}

			var requestData struct {
				Word       string `json:"word"`
				Definition string `json:"definition"`
			}
			err = json.Unmarshal(body, &requestData)
			if err != nil {
				http.Error(w, "Error deserializing JSON", http.StatusBadRequest)
				return
			}
			wg.Add(1)
			addChannel <- requestData
			fmt.Fprint(w, "Word added successfully.")
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/remove", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "DELETE" {
			word := r.FormValue("word")
			dict.Remove(word)
			fmt.Fprint(w, "Word removed successfully.")
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/list", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			result := dict.List()
			data, err := json.Marshal(result)
			if err != nil {
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(data)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// Wait for the completion of the adding goroutine before exiting
	wg.Wait()

	fmt.Println("Starting the server on :8081...")
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("Error starting the server:", err)
	} else {
		fmt.Println("Server started successfully.")
	}
}
