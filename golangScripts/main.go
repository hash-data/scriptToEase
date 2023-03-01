package main

import (
	"fmt"
	"math/rand"
	"os"

	"gopkg.in/yaml.v2"
)

const codeLength = 8

type UserConfig struct {
	SourceLimit   int      `yaml:"source_limit"`
	RowsLimit     int      `yaml:"rows_limit"`
	ReferralCodes []string `yaml:"referral_codes"`
}

type Config map[string]UserConfig

func main() {
	referralCodes := generateReferralCodes()
	userConfig := UserConfig{
		SourceLimit:   5,
		RowsLimit:     100000000,
		ReferralCodes: referralCodes,
	}
	config := Config{"pitch_ground": userConfig}

	data, err := yaml.Marshal(config)
	if err != nil {
		fmt.Println("Error marshalling YAML:", err)
		return
	}

	file, err := os.Create("config.yaml")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	file.Write(data)
	fmt.Println("Successfully generated config.yaml")
}

func generateReferralCodes() []string {
	var referralCodes []string
	for i := 1; i <= 500; i++ {
		code := generateCode()
		code = "pgdz-" + code
		referralCodes = append(referralCodes, code)
	}
	return referralCodes
}

func generateCode() string {
	letters := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
	code := make([]byte, codeLength)
	for i := range code {
		code[i] = letters[rand.Intn(len(letters))]
	}
	return string(code)
}
