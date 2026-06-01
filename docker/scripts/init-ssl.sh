#!/bin/bash

# SSL Certificate Initialization Script
# Run this script on first deployment to obtain SSL certificates

set -e

DOMAIN="${DOMAIN:-byurhannurula.com}"
EMAIL="${EMAIL:-hello@byurhannurula.com}"
STAGING="${STAGING:-0}"

echo "=== SSL Certificate Initialization ==="
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo "Staging: $STAGING"
echo ""

# Create required directories
mkdir -p certbot/conf certbot/www

# Check if certificates already exist
if [ -d "certbot/conf/live/$DOMAIN" ]; then
    echo "Certificates already exist for $DOMAIN"
    echo "To renew, run: docker compose exec certbot certbot renew"
    exit 0
fi

# Start nginx for ACME challenge
echo "Starting nginx for ACME challenge..."
docker compose -f docker-compose.init.yml up -d nginx-init

# Wait for nginx to start
sleep 5

# Set staging flag if needed
STAGING_FLAG=""
if [ "$STAGING" = "1" ]; then
    STAGING_FLAG="--staging"
    echo "Using Let's Encrypt staging environment"
fi

# Obtain certificate
echo "Obtaining SSL certificate..."
docker compose -f docker-compose.init.yml run --rm certbot-init certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    $STAGING_FLAG

# Stop init nginx
echo "Stopping init nginx..."
docker compose -f docker-compose.init.yml down

echo ""
echo "=== SSL Certificate obtained successfully! ==="
echo "You can now start the full stack with: docker compose up -d"
