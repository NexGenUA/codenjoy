call mvn -DMAVEN_OPTS=-Xmx1024m -Dmaven.test.skip=true -Dspring-boot.run.profiles=sqlite,trace,debug clean spring-boot:run -DallGames