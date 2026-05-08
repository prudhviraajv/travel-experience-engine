# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the static website files to the default Nginx public folder
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Expose port 80 (required by Cloud Run if not dynamically set, though Cloud Run dynamically sets PORT. Nginx default is 80, Cloud Run will route it).
# It's a good practice to use the PORT environment variable in Cloud Run, so we'll configure nginx to use it.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx when the container starts
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
