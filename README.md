# My WebApp — Kubernetes + ArgoCD

אתר אינטרנט מנוהל דרך GitOps עם ArgoCD ו-Kubernetes.

## מבנה הפרויקט

```
.
├── app/                  # קוד האפליקציה
│   ├── server.js         # שרת Node.js + Express
│   ├── public/index.html # ממשק משתמש
│   ├── package.json
│   └── Dockerfile
├── k8s/                  # Kubernetes manifests
│   ├── namespace.yaml
│   ├── deployment.yaml   # 3 replicas
│   ├── service.yaml
│   └── ingress.yaml
└── argocd/
    └── application.yaml  # ArgoCD Application
```

## הגדרה ראשונית

### 1. בנה ודחף את ה-Docker image
```bash
docker build -t your-dockerhub-username/my-webapp:latest ./app
docker push your-dockerhub-username/my-webapp:latest
```

### 2. עדכן את הקבצים
- [k8s/deployment.yaml](k8s/deployment.yaml): שנה את שם ה-image לשם שלך
- [k8s/ingress.yaml](k8s/ingress.yaml): שנה את ה-host לדומיין שלך
- [argocd/application.yaml](argocd/application.yaml): שנה את כתובת הריפו

### 3. דחף לגיט
```bash
git init
git add .
git commit -m "initial: webapp + k8s manifests + argocd app"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 4. החל את ArgoCD Application
```bash
kubectl apply -f argocd/application.yaml
```

ArgoCD ידאג לסנכרן את כל ה-k8s/ manifests אוטומטית.

## כיצד זה עובד

```
Git push  →  ArgoCD מזהה שינוי  →  מחיל על Kubernetes  →  3 Pods רצים
```

- **Automated sync**: כל שינוי בגיט מוחל אוטומטית
- **Self-heal**: שינויים ידניים בקלאסטר מתוקנים אוטומטית
- **Rolling update**: עדכונים ללא downtime
- **Health checks**: liveness + readiness probes על `/health`
