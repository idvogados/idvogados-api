FROM openjdk:alpine

ENV FIRESTORE_VERSION 1.4.0
ADD https://storage.googleapis.com/firebase-preview-drop/emulator/cloud-firestore-emulator-v$FIRESTORE_VERSION.jar ./cloud-firestore-emulator.jar

EXPOSE 8080

CMD ["java", "-jar", "./cloud-firestore-emulator.jar", "--host=0.0.0.0", "--port=8080"]