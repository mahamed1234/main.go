package dictionary

import (
	"fmt"
	"sort"
)

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

func (d *Dictionary) List() []string {
	var result []string
	for word, definition := range d.entries {
		result = append(result, fmt.Sprintf("%s: %s", word, definition))
	}
	sort.Strings(result)
	return result
}
