pipeline {
  stages {
    stage {'Inside Docker'} {
      agent {
        dockerfile {
          filename 'Dockerfile'
          // args '-v /var/jenkins_home/sonar-scanner:/var/jenkins_home/sonar-scanner -v /var/run/docker.sock:/var/run/docker.sock'
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

        stage('Compile') {
          steps {
            sh 'yarn build:prod'
          }
        }
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

    stage('Archive') {
      steps {
        archiveArtifacts 'dist/pokerplanner/**'
      }
    }

  }
}
