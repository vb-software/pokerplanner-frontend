pipeline {
  agent none
  stages {
    stage('Fetch dependencies') {
      agent {
        docker 'circleci/node:12-stretch-browsers'
      }
      steps {
        sh 'yarn'
        stash includes: 'node_modules/', name: 'node_modules'
      }
    }
    stage('Lint') {
      agent {
        docker 'circleci/node:12-stretch-browsers'
      }
      steps {
        unstash 'node_modules'
        sh 'yarn lint'
      }
    }
    stage('Unit Test') {
      agent {
        docker 'circleci/node:12-stretch-browsers'
      }
      steps {
        unstash 'node_modules'
        sh 'yarn test:ci'
        sh 'yarn sonar'
        junit 'coverage/**/*.xml'
      }
    }
    stage('Compile') {
      agent {
        docker 'circleci/node:12-stretch-browsers'
      }
      steps {
        unstash 'node_modules'
        sh 'yarn build:prod'
        stash includes: 'dist/', name: 'dist'
      }
    }
  }
}