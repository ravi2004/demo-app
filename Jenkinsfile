pipeline {
    agent  {
        label "ubuntutest"
    }
    stages {
        stage('Build') { 
            steps {
                //sh 'npm install'
                //sh 'npm run build'
                sh 'sudo docker build -t demo-app .'
                //sh 'sudo docker run -d -p 80:80 --name demo-app demo-app'
            }
        }
        stage('Run') { 
            steps {
                //sh 'npm install'
                //sh 'npm run build'
                //sh 'sudo docker build -t demo-app .'
                sh 'sudo docker run -d -p 80:80 --name demo-app demo-app'
            }
        }        
    }
}
