FROM httpd

# Remove default Apache files
RUN rm -rf /usr/local/apache2/htdocs/*

# Set the ServerName directive globally to suppress the "Could not reliably determine the server's fully qualified domain name" message.
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Start Apache
CMD ["httpd-foreground"]
