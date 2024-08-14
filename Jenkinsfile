#!/usr/bin/groovy
import groovy.json.JsonOutput

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
    }
    agent {
        agent { docker { image 'mcr.microsoft.com/playwright:v1.43.0-jammy' } }
    }
    environment {
        NODE_ENV = "${env.NODE_ENV}"
        PW_PROJECT= "${env.PW_PROJECT}"
        PW_WORKERS = "${env.PW_WORKERS}"
        PW_SHARDS = "${env.PW_SHARDS}"
        PW_TAG = "${env.PW_TAG}"
        PW_SCREENSHOT_ON_FAIL = "${env.PW_SCREENSHOT_ON_FAIL}"
        USE_ALLURE = 1
    }
    stages {
        stage("Install Node Dependencies"){
            steps {
                script {
                    echo sh(script: "npm i --no-fund --no-audit --omit=dev")
                }
            }
        }
        stage("Run PlayWright tests"){
            steps {
                script {
                    parallel executeTestParallel()
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'allure-results/*', followSymlinks: false
            script {
                ws("$workspace/") {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [
                            [path: 'allure-results']
                        ]
                    ])
                }
            }
            cleanWs()
        }
        // failure {
        //     slackSend(channel: "$SLACK_CHANNELS", color: "danger", message: ":scream: Failed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (<${env.BUILD_URL}|Open>)")
        // }
        // success {
        //     slackSend(channel: "$SLACK_CHANNELS", color: "good", message: ":smiley: Passed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (<${env.BUILD_URL}|Open>)")
        // }
        // unstable {
        //     slackSend(channel: "$SLACK_CHANNELS", color: "warning", message: ":cold_sweat: Unstable: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (<${env.BUILD_URL}|Open>)")
        // }
    }
}

String getTestCommand(String shard) {
    return "npx playwright test --workers=${env.PW_WORKERS} --shard=${shard}/${env.PW_SHARDS} --grep \"^(?=.*@${env.PW_TAG})\" --project=${env.PW_PROJECT}"
}

void executeTestParallel() {
    def tests = [:]
    for (int i = 1; i <= env.PW_SHARDS.toInteger(); i++) {
        def command = getTestCommand("${i}")
        def stageName = "Shard ${i}"
        tests[command] = { 
            stage("${env.PW_TAG} - ${stageName}") {
                echo sh(script: "${command}")
            }
        }
    }
    return tests
}
