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
        junit 'reports/**/*.xml'
      }
    }
    stage('E2E Test') {
      agent {
        docker 'circleci/node:12-stretch-browsers'
      }
      steps {
        unstash 'node_modules'
        sh 'mkdir -p reports'
        sh 'yarn e2e:pre-ci'
        sh 'yarn e2e:ci'
        sh 'yarn e2e:post-ci'
        junit 'coverage/**/test-report.xml'
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