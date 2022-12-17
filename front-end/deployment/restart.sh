#!/bin/bash

# ssh [r-number]@st.cs.kuleuven.be
# - r-nummer pwd???

# ssh fmmi@picasso.experiments.cs.kuleuven.be -p2222
# - keypair passphrase ??

let RNUMMER=0662209

ssh "$RNUMMER"@st.cs.kuleuven.be "ssh fmmi@picasso.experiments.cs.kuleuven.be -p2222 \"\""