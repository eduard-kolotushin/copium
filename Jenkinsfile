pipeline {
    agent any

    environment {
		DOCKERHUB_CREDENTIALS=credentials('docker_hub_auth')
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
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
    post {
		always {
			sh 'docker logout'
		}
	}
}