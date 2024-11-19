pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                //sh 'npm install'
                //sh 'npm run build'
                sh 'docker build -t demoapp .'
                sh 'docker run -d -p 80:80 --name demo-app demo-app'
            }
        }
    }
}
