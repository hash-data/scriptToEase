filename = input("test.html")
print(filename)
# Read lines from the input file and store them in a set to remove duplicates
with open(filename, 'r') as file:
    lines = set(file.readlines())

# Write the non-duplicate lines to a new file
with open("new_" + filename, 'w') as new_file:
    new_file.writelines(lines)

print("Duplicate lines removed and new file created successfully.")
