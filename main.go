package main

import (
	dictionary "Dictionnaire/dictionnary"
	"fmt"
)

func main() {
	dict := dictionary.NewDictionary()
	dict.Add("go", "Go programming language")
	dict.Add("rust", "Systems programming language")

	fmt.Println(dict.Get("go"))
	fmt.Println(dict.Get("rust"))

	dict.Remove("rust")

	fmt.Println(dict.List())
}
