import sys, json;

print("existing env vars: ", json.loads(sys.argv[1]))
print("api_values: ", json.loads(sys.argv[2]))

# print(json.load(sys.stdin))
