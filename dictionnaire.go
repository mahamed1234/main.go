package main

import "fmt"

type Dictionary struct {
	entries map[string]string
}

func NewDictionary() *Dictionary {
	return &Dictionary{
		entries: make(map[string]string),
	}
}

func (d *Dictionary) Add(word, definition string) {
	d.entries[word] = definition
}

func (d *Dictionary) Get(word string) (string, bool) {
	definition, found := d.entries[word]
	return definition, found
}

func (d *Dictionary) Remove(word string) {
	delete(d.entries, word)
}

func (d *Dictionary) List() {
	for word, definition := range d.entries {
		fmt.Printf("%s: %s\n", word, definition)
	}
}

func main() {
	dictionary := NewDictionary()

	dictionary.Add("fraise", "fruit")
	dictionary.Add("go", "langage de programmation")
	dictionary.Add("computer", "machine électronique")

	wordToGet := "go"
	definition, found := dictionary.Get(wordToGet)
	if found {
		fmt.Printf("La définition de %s est : %s\n", wordToGet, definition)
	} else {
		fmt.Printf("%s n'a pas été trouvé dans le dictionnaire\n", wordToGet)
	}

	wordToRemove := "go"
	dictionary.Remove(wordToRemove)

	fmt.Println("\nDictionnaire après suppression:")
	dictionary.List()
}
