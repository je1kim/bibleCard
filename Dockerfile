# prod environment
FROM nginx:stable-alpine

# Make Web Directory 
RUN mkdir -p /app/bpmcYouth
RUN mkdir -p /app/src

COPY ./bibleCard/ /app/bpmcYouth/

# 컨테이너의 80번 포트를 열어준다.
EXPOSE 80

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]
