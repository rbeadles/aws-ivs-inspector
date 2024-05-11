import sys, json;

print("existing env vars: ", sys.argv[0])
print("api_values: ", sys.argv[1])
print("api_values json: ", json.load(sys.argv[1]))

# print(json.load(sys.stdin))
