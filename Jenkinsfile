pipeline {
  agent {
    dockerfile true
  }
  stages {
    stage('Fetch dependencies') {
      steps {
        sh 'yarn'
      }
    }

    stage('Run Lint') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Run Unit Test') {
      steps {
        sh 'yarn test:ci'
      }
    }

    stage('Publish Test Results') {
      steps {
        junit 'coverage/**/*.xml'
      }
    }

    stage('SonarQube') {
      environment {
        scannerHome = tool 'SonarQubeScanner'
      }
      steps {
        withSonarQubeEnv('sonarqube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }

        timeout(time: 10, unit: 'MINUTES') {
          waitForQualityGate true
        }

      }
    }

    stage('Compile') {
      steps {
        sh 'yarn build:prod'
      }
    }

  }
}