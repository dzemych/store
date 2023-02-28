service_exists() {
    local name=$1

    if [[ $(systemctl list-units --all -t service --full --no-legend "$name.service" | sed 's/^\s*//g' | cut -f1 -d' ') == $name.service ]]; then
        return 0
    else
        return 1
    fi
}

# Install nvm (node lts)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
export NVM_DIR=$HOME/.nvm
source $NVM_DIR/nvm.sh

nvm install node --lts
nvm use node --lts


# Install mongodb
if [ $(service_exists mongod) ]
then
  sudo apt-get install gnupg
  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
fi

sudo service mongod start


# Install server deps
npm ci

# Install admin deps
cd admin
npm ci
cd ..

# Install client deps
cd client
npm ci
cd ..