
oc create -f openshift/jboss-datagrid-template.yml
oc create -f openshift/image-recognition-template.yml
oc new-app --template=jboss-datagrid -p JBOSSDATAGRID_SERVICE_NAME=jboss-datagrid-1
oc new-app --template=image-recognition-service -p IMAGE_REC_SRV_NAME=tensorflow-service-test -p JDG_HOSTNAME=jboss-datagrid-1
