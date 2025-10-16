#!/bin/bash

# Connection-based schemas
for schema in connection-brute-force connection-ssh-attack connection-rdp-attack; do
cat > ${schema}.json << EOF
{
	"\$schema": "https://json-schema.org/draft/2020-12/schema",
	"\$id": "https://xarf.org/schemas/v4/types/${schema}.json",
	"title": "XARF v4 ${schema} Type Schema",
	"description": "Schema for ${schema} reports",
	"allOf": [
		{
			"\$ref": "./content-base.json"
		},
		{
			"type": "object",
			"properties": {
				"type": {
					"const": "${schema#connection-}"
				}
			}
		}
	]
}
EOF
done

# Copyright schemas
for schema in copyright-streaming copyright-counterfeit; do
cat > ${schema}.json << EOF
{
	"\$schema": "https://json-schema.org/draft/2020-12/schema",
	"\$id": "https://xarf.org/schemas/v4/types/${schema}.json",
	"title": "XARF v4 ${schema} Type Schema",
	"description": "Schema for ${schema} reports",
	"allOf": [
		{
			"\$ref": "./content-base.json"
		},
		{
			"type": "object",
			"properties": {
				"type": {
					"const": "${schema#copyright-}"
				}
			}
		}
	]
}
EOF
done

# Infrastructure schemas
for schema in infrastructure-proxy infrastructure-vpn-abuse infrastructure-mining infrastructure-c2; do
cat > ${schema}.json << EOF
{
	"\$schema": "https://json-schema.org/draft/2020-12/schema",
	"\$id": "https://xarf.org/schemas/v4/types/${schema}.json",
	"title": "XARF v4 ${schema} Type Schema",
	"description": "Schema for ${schema} reports",
	"allOf": [
		{
			"\$ref": "./content-base.json"
		},
		{
			"type": "object",
			"properties": {
				"type": {
					"const": "${schema#infrastructure-}"
				}
			}
		}
	]
}
EOF
done

# Messaging schemas
for schema in messaging-sms-spam messaging-whatsapp-spam messaging-social-spam messaging-voip-spam; do
cat > ${schema}.json << EOF
{
	"\$schema": "https://json-schema.org/draft/2020-12/schema",
	"\$id": "https://xarf.org/schemas/v4/types/${schema}.json",
	"title": "XARF v4 ${schema} Type Schema",
	"description": "Schema for ${schema} reports",
	"allOf": [
		{
			"\$ref": "./content-base.json"
		},
		{
			"type": "object",
			"properties": {
				"type": {
					"const": "${schema#messaging-}"
				}
			}
		}
	]
}
EOF
done

# Reputation schema
cat > reputation-abuse-score.json << EOF
{
	"\$schema": "https://json-schema.org/draft/2020-12/schema",
	"\$id": "https://xarf.org/schemas/v4/types/reputation-abuse-score.json",
	"title": "XARF v4 reputation-abuse-score Type Schema",
	"description": "Schema for reputation abuse score reports",
	"allOf": [
		{
			"\$ref": "./content-base.json"
		},
		{
			"type": "object",
			"properties": {
				"type": {
					"const": "abuse-score"
				}
			}
		}
	]
}
EOF

echo "Created all remaining schemas"
