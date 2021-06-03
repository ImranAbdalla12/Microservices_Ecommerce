const MyCred = new Buffer.from(
    JSON.stringify({
        "type": "service_account",
        "project_id": "myecommerce-e7daa",
        "private_key_id": "8ae9f0e9b23231b4ff8aacc3ea1241a1a6788da3",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/8Hlabdy/GOpz\n94X54dxlFCY/Riqp+XyGP3FWW7LFTWQLiuXNmk0totsKMkafyVrzFktAIbV0TUO/\nIfzspMF/U9CpRjpEo3yhRgMteVbY+TGynNnC1N8s9XvZ1XqbZeG4geyf3BF99vcN\n33vjkNoz6kegCvARFCcQe6ZuSngT/i3UE9rcQRsTECLW05Y27ZLVtrmbTz2PDLWQ\n705L4qej+dH0vzf65Jq/yiCXnVqlJDgKYbYbVOtyA/4KR2WMGgzWmu7IVAbWJhzR\nr49uMs/i9lstV2lmsyYoNDPtBYNl81ty3SkNAn/GIQdSze7rWcJMoIE5S9lsiVnS\nwTH4sZ9DAgMBAAECggEAJ4sllUnZFs3NT8MJKSgtPe3ey15rX8V0sDvV39LYi+mb\n2Pzux2Moz2Qj+H/PKRBU2owXSMkpFyLr+C7Kav6ulsrvzFAZpRaBkMBZ2z6Kc/0z\nDfderdMpf5u7vm9K6UUeMeMimvS97dO5pnQKlCG9ssBrrT9TolEikzTGXyacgpGZ\nV19i4YDddy3agdGYVGexg/R6bb30ewcJs9MA4gxWlk1xMnfsbUjB+QCAxrwwkwAO\nqPqwUn87xDPn4Xi4BL/r6qPeNRri83z8+OrwIlBgX6zAEcqzDWKmrcF8vjNEUvBK\nLY8K7X763qx2HUdWzC12xEdEANDtwaifvsi8ruseMQKBgQD7EyxY11xLXPo0m3g3\nqNwNlhtoxe6mAArhFnbNShVw8VcTPp2efTroAUvmbwGbGsTD6HsEsjHsqUrHL4vY\nqTX9jyMPSMSQqd2PVdonohRwXeQI3ulfbaODu7rz6IGMMy/l6jsx9LcQWqnxUfYf\nVBA1kAA8G0e32MUC6VTtbU3eLQKBgQDDtFbC4kcBsHyCz1HspHDkPtkxxcjoFS2m\n63W462fNfqV8FlBWnU3LIaVKD8pKHd7yuorwaWka2xVIf8nRaxoLqoUqwGvadxA7\ndsEFtjDnMpyLvs+hPELwfnHYnWj01+USwRKnt6zr4XxhPfsc/te7pi025UUKNQjp\nJMwG0RdJLwKBgFpNLA8L7hsA5tCS9ir2paaRTWxifBHiRAduv+3X7lw/wPSf+aqu\nGcil5rmLRUWW3Bwl+lDXElOvE8EOHbsgKNX4bECsCF6Laa+Kzjqg9b7wVfrGyaLT\n2RKhK31cK3PUWS7VDtNJ06mjIio0M1RTNL0+/IahvSqnYTxJ1YzLWk1FAoGAOTiP\nbafvjwTlQvIPSBvEjlf59V2ZIpKeqIGMCCd8UE9JX4C+uLSBvHT3+TGougcF2v7E\nBQstGhcYn/wNLFgeY27WROvCHTxW2KweP+dHYTIhJ5MA7mnKQLsX2ngb6gr+BX/C\nTpubydRCI8SVmaLBvTIXYkei6hsbod+KcCvOnS0CgYAmsRDMAk71tjCM1F8SD5U5\n59ilRJnPleaASUZH6bkPCLPpTARondJ9qfjwNO5Dmy4NzyF2oKwE0NveL7efnMDg\noAM0jMvtUkYEp9+7subiox4uv2bD1NI407bwOGTGla09EbMP+s40HIRoTelTdb/c\ncBknJ6u5ntCj+TlNRl5ZEQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-4aqk4@myecommerce-e7daa.iam.gserviceaccount.com",
        "client_id": "109203883123971106077",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4aqk4%40myecommerce-e7daa.iam.gserviceaccount.com"
    })
  ).toString('base64');
  console.log(MyCred);