pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      args '-v /var/jenkins_home/sonar-scanner:/var/jenkins_home/sonar-scanner -v /var/run/docker.sock:/var/run/docker.sock --net jenkins'
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

    stage('Analyze') {
      agent {
        docker {
          image 'sonarsource/sonar-scanner-cli'
          // In order to be able to use http://sonarqube:9000 we need to be in the
          // same network as Jenkins and SonarQube are in.
          args '--net jenkins'
          // To quarantee that the workspace contains the sources pulled in previous
          // stage, we need to use the pipeline level workspace.
          reuseNode true
        }
      }
      steps {
        // The parameter must match the name you gave for the SonarQube server when
        // configuring it.
        withSonarQubeEnv('Sonar') {
          // Here, job name is used as the project key and current workspace as the
          // sources location.
          sh """
            sonar-scanner \
              -D'sonar.projectKey=${JOB_NAME}'\
              -D'sonar.sources=${WORKSPACE}'
          """
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
