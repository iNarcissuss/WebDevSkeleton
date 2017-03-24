from oauth2client import client, crypt

# (Receive token by HTTPS POST)

def get_user(token, client_id):
    """ Get Valid User Id From Google """

    idinfo = client.verify_id_token(token, client_id)

    # Or, if multiple clients access the backend server:
    #idinfo = client.verify_id_token(token, None)
    #if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
    #    raise crypt.AppIdentityError("Unrecognized client.")

    if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
        # wrong issuer
        userid = None
    else:
        userid = idinfo['sub']
    return userid
