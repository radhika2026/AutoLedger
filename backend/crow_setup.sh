# !!!Always run the script with root permissions
# Script to setup crow HTTP server

cd ResilientDB-GraphQL/

#Comment below if not for the 1st time
#sudo apt update
#sudo apt install build-essential
#sudo apt install python3.10-dev
#sudo apt install apt-transport-https curl gnupg

#Build crow HTTP server
bazel build service/http_server:crow_service_main

#Start the crow HTTP server
bazel-bin/service/http_server/crow_service_main service/tools/config/interface/service.config service/http_server/server_config.config
