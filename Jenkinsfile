pipeline {
  agent none
  stages {
    stage('Fetch dependencies') {
      agent {
        dockerfile true
      }
      steps {
        sh 'yarn'
        stash(includes: 'node_modules/', name: 'node_modules')
      }
    }

    stage('Lint') {
      agent {
        dockerfile true
      }
      steps {
        unstash 'node_modules'
        sh 'yarn lint'
      }
    }

    stage('Unit Test') {
      agent {
        dockerfile true
      }
      steps {
        unstash 'node_modules'
        sh 'yarn test:ci'
        junit 'coverage/**/*.xml'
      }
    }

    stage('Compile') {
      agent {
        dockerfile true
      }
      steps {
        unstash 'node_modules'
        sh 'yarn build:prod'
        stash(includes: 'dist/', name: 'dist')
      }
    }

  }
}