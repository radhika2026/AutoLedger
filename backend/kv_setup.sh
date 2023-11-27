# !!!Always run the script with root permissions
# Script to setup kv_service for the 1st time

cd resilientdb/

#Comment this out if not the 1st time
#./INSTALL.sh

./service/tools/kv/server_tools/start_kv_service.sh

#Build interactive tools
bazel build service/tools/kv/api_tools/kv_service_tools

#Tools to get & set key-value pairs
#bazel-bin/service/tools/kv/api_tools/kv_service_tools service/tools/config/interface/service.config set test test_value
#bazel-bin/service/tools/kv/api_tools/kv_service_tools service/tools/config/interface/service.config get test 
#bazel-bin/service/tools/kv/api_tools/kv_service_tools service/tools/config/interface/service.config getallvalues

cd ..

echo "Done with setting up kv_service"
ps -aef | grep kv_service
