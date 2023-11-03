
def encrypt(inputText, N, D):
    inputText = inputText[::-1]
    outputString = ""
    for char in inputText:
        if(char == ' ' or char == '!'):
            continue
        else:
            outputString = outputString + shift(char, N, D)
    return outputString

def decrypt(inputText, N, D):
    outputString = ""
    for char in inputText:
        if(char == ' ' or char == '!'):
            continue
        else:
            outputString = outputString + shift(char, N, -1*D)
    outputString = outputString[::-1]
    return outputString

def shift(inputChar, N, D):
    ascii = ord(inputChar)
    ascii -= 34
    ascii = (ascii+(D*(N%(126-34+1))))%(126-34+1)
    ascii += 34
    return chr(ascii)