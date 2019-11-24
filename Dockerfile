FROM circleci/node:12-stretch-browsers

RUN echo "deb http://http.debian.net/debian stretch-backports main" | sudo tee --append /etc/apt/sources.list
RUN sudo apt-get update
RUN sudo apt-get install -t stretch-backports openjdk-8-jdk

ENV JAVA_HOME /usr/lib/jvm/java-8-oracle