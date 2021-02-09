pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      args '-v /var/jenkins_home/sonar-scanner:/var/jenkins_home/sonar-scanner'
    }
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
          sh "${scannerHome}/bin/sonar-scanner -Dsonar.branch.name=${BRANCH_NAME}"
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

    stage('Archive') {
      steps {
        archiveArtifacts 'dist/pokerplanner/**'
      }
    }

  }
}
