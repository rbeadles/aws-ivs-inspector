import sys, json;

existing_env_vars = json.loads(sys.argv[1])
cognito_vars = json.loads(sys.argv[2])

# print("cognito_vars: ", cognito_vars)
# print("cognito_vars type: ", type(json.loads(cognito_vars)))

for key, value in cognito_vars.items():
    print(key, value)
    existing_env_vars[key] = value

print(json.dumps(existing_env_vars))

