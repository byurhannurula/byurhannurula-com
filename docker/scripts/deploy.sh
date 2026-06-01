#!/bin/bash

# Deployment helper script
# Usage: ./docker/scripts/deploy.sh [command]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_DIR"

case "${1:-help}" in
  pull)
    echo "Pulling latest image..."
    docker compose pull
    ;;
  
  up)
    echo "Starting services..."
    docker compose up -d
    ;;
  
  down)
    echo "Stopping services..."
    docker compose down
    ;;
  
  restart)
    echo "Restarting services..."
    docker compose restart
    ;;
  
  update)
    echo "Updating deployment..."
    docker compose pull
    docker compose up -d --remove-orphans
    docker image prune -f
    echo "Update complete!"
    ;;
  
  logs)
    docker compose logs -f "${2:-}"
    ;;
  
  status)
    docker compose ps
    ;;
  
  ssl-renew)
    echo "Renewing SSL certificates..."
    docker compose exec certbot certbot renew
    docker compose restart nginx
    ;;
  
  ssl-status)
    docker compose exec certbot certbot certificates
    ;;
  
  backup)
    BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    echo "Creating backup: $BACKUP_FILE"
    tar -czvf "$BACKUP_FILE" \
      .env.production \
      certbot/conf \
      docker/nginx/nginx.conf
    echo "Backup created: $BACKUP_FILE"
    ;;
  
  health)
    echo "Checking health..."
    echo ""
    echo "=== Container Status ==="
    docker compose ps
    echo ""
    echo "=== App Health ==="
    curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000/ || echo "App not responding on localhost"
    echo ""
    echo "=== Nginx Health ==="
    docker compose exec nginx nginx -t 2>&1 || echo "Nginx config test failed"
    ;;
  
  clean)
    echo "Cleaning up Docker resources..."
    docker system prune -af --volumes
    ;;
  
  help|*)
    echo "Portfolio Deployment Helper"
    echo ""
    echo "Usage: $0 <command>"
    echo ""
    echo "Commands:"
    echo "  pull       Pull latest Docker image"
    echo "  up         Start all services"
    echo "  down       Stop all services"
    echo "  restart    Restart all services"
    echo "  update     Pull and restart (full update)"
    echo "  logs       View logs (optionally specify service: logs app)"
    echo "  status     Show container status"
    echo "  ssl-renew  Renew SSL certificates"
    echo "  ssl-status Show SSL certificate status"
    echo "  backup     Create backup of config files"
    echo "  health     Check health of all services"
    echo "  clean      Clean up Docker resources"
    echo "  help       Show this help message"
    ;;
esac
