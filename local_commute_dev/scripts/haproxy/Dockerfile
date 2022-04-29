FROM haproxy:latest
ARG BUILDPLATFORM
RUN echo $BUILDPLATFORM
COPY ./ssl/go-talk.kr/go-talk.kr.pem /usr/local/etc/haproxy/
COPY ./ssl/go-talk.kr/go-talk.kr.ca.pem /usr/local/etc/haproxy/
COPY ./ssl/go-talk.kr/ssl-bundle.crt /usr/local/etc/haproxy/
COPY ./ssl/go-talk.kr/dhparam.pem /usr/local/etc/haproxy/
COPY ./ssl/go-talk.kr/USERTrust_RSA_Certification_Authority.crt /usr/local/etc/haproxy/
COPY ./ssl/go-talk.kr/AAA_Certificate_Services.crt /usr/local/etc/haproxy/
COPY ./ssl/go-talk.kr/_go-talk_kr.crt /usr/local/etc/haproxy/
COPY ./conf/haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg