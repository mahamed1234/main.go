package main

import "fmt"

func add(dictionary map[string]string, word, definition string) {
	dictionary[word] = definition
}

func getDefinition(dictionary map[string]string, word string) (string, bool) {
	definition, found := dictionary[word]
	return definition, found
}

func remove(dictionary map[string]string, word string) {
	delete(dictionary, word)
}

func list(dictionary map[string]string) {
	for word, definition := range dictionary {
		fmt.Printf("%s: %s\n", word, definition)
	}
}

func main() {
	dictionary := make(map[string]string)

	add(dictionary, "fraise", "fruit")
	add(dictionary, "go", "langage de programmation")
	add(dictionary, "computer", "machine électronique")

	wordToGet := "go"
	definition, found := getDefinition(dictionary, wordToGet)
	if found {
		fmt.Printf("La définition de %s est : %s\n", wordToGet, definition)
	} else {
		fmt.Printf("%s n'a pas été trouvé dans le dictionnaire\n", wordToGet)
	}

	wordToRemove := "go"
	remove(dictionary, wordToRemove)

	fmt.Println("\nDictionnaire après suppression:")
	list(dictionary)
}
