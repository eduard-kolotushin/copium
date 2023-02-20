pipeline {
    agent any

    environment {
		DOCKERHUB_CREDENTIALS=credentials('docker_hub_auth')
		DB_NAME=credentials('db_name')
		DB_USER=credentials('db_user')
		DB_PASSWORD=credentials('db_password')
		DB_HOST=credentials('db_host')
		DB_PORT=credentials('db_port')
	}

    stages {
        stage('Build') {
            steps {
                echo 'Building image...'
                sh 'docker build -t evkolotushin/test_jenkins:latest .'
                echo 'Login to docker hub...'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                echo 'Push image to repo...'
                sh 'docker push evkolotushin/test_jenkins:latest'
                echo 'Delete image...'
                sh 'docker rmi evkolotushin/test_jenkins:latest'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'python3 -m venv venv'
                sh 'source ./venv/bin/activate'
                sh 'pip install -r requirements.txt'
                sh 'pytest --junitxml=report.xml'
                sh 'deactivate'
                sh 'rm -r venv'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sshagent(['ssh_to_kubectl']) {
					sh 'scp -r -o StrictHostKeyChecking=no k8s/deployment.yaml root@94.198.216.254:/root'
					sh 'scp -r -o StrictHostKeyChecking=no k8s/environment-configmap.yaml root@94.198.216.254:/root'
					script {
						try {
						    sh 'ssh root@94.198.216.254 kubectl create secret generic db-secret --from-literal=DB_NAME=$DB_NAME --from-literal=DB_USER=$DB_USER --from-literal=DB_PASSWORD=$DB_PASSWORD --from-literal=DB_HOST=$DB_HOST --from-literal=DB_PORT=$DB_PORT --kubeconfig=/root/config-jenkins-tutorial --save-config --dry-run=client -o yaml | ssh root@94.198.216.254 kubectl apply -f - --kubeconfig=/root/config-jenkins-tutorial'
						    sh 'ssh root@94.198.216.254 kubectl apply -f environment-configmap.yaml --kubeconfig=/root/config-jenkins-tutorial'
							sh 'ssh root@94.198.216.254 kubectl apply -f /root/deployment.yaml --kubeconfig=/root/config-jenkins-tutorial'
						}catch(error) {

						}
					}
				}
            }
        }
    }
    post {
		always {
			sh 'docker logout'
			junit 'report.xml'
		}
	}
}