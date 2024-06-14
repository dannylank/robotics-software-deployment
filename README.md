# Robotics Software Deployment

This repository contains the necessary files for deploying the robotics software using various tools and services.

## Configuration

### Python Microservice (K8s)
- YAML file: `microservice.yaml`
- Variables:
  - Namespace: `tech.prod`
  - Memory limit: `3Gi`
  - Container port: `8000`

### Azure DevOps Pipeline
- YAML file: `azure-pipeline.yaml`
- Variables:
  - buildConfiguration: `Release`
  - Agent pool: `ubuntu-latest`
  - Python version: `3.9`

### CloudFlare Worker
- Worker file: `cloudflare-worker.js`
- Variables:
  - Base URL for original image: `https://example.com`
  - Resize width: `800`

### Observability Diagram
- Diagram file: `observability-diagram.png`
- Tools used:
  - Prometheus: Metrics collection
  - Grafana: Metrics visualization
  - Nginx: Reverse proxy and load balancer
  - LinkerD: Microservice routing and observability
  - Kafka: Messaging system
  - Loki: Log collection and storage
  - Cloudflare: CDN and worker for image resizing and caching

## Usage

1. Clone this repository to your local machine.
2. Ensure you have the necessary tools and services set up correctly.
3. Use the YAML files and Dockerfile to deploy the Python microservice to a K8s cluster.
4. Configure the Azure DevOps pipeline using the `azure-pipeline.yaml` file.
5. Deploy the CloudFlare Worker for image resizing and caching.
6. Utilize the observability tools mentioned in the diagram to monitor and troubleshoot the system.

If you have any questions or need further information, please feel free to contact the DevOps team.
