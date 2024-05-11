import sys, json;

print("existing env vars: ", sys.argv[1])
print("api_values: ", sys.argv[2])
print("api_values json: ", json.loads(sys.argv[2]))

# print(json.load(sys.stdin))
