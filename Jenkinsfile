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

    stage('Lint') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Unit Test') {
      steps {
        sh 'yarn test:ci'
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
        unstash 'node_modules'
        sh 'yarn build:prod'
        stash(includes: 'dist/', name: 'dist')
      }
    }

  }
}