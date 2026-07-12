# FUZION COACHING INSTITUTE

Production-grade Coaching Management System.

## Live website 

https://thelonelystick.github.io/FUZION-COACHING-INSTITUTE/

## Project roles

| Folder                   | Owner             |
| ------------------------ | ----------------- |
| `apps/web/pages/public`  | Frontend Team     |
| `apps/web/pages/student` | Frontend Team     |
| `apps/web/pages/teacher` | Frontend Team     |
| `apps/web/pages/parent`  | Frontend Team     |
| `apps/web/pages/admin`   | Frontend Team     |
| `functions`              | Backend Team      |
| `firestore`              | Database Team     |
| `packages/ui`            | UI/UX Team        |
| `packages/types`         | Architecture Team |
| `scripts`                | DevOps Team       |
| `.github`                | CI/CD Team        |

## Repository Structure

```text
FUZION-COACHING-INSTITUTE/
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   │   ├── public/
│   │   │   │   ├── student/
│   │   │   │   ├── teacher/
│   │   │   │   ├── parent/
│   │   │   │   └── admin/
│   │   │   ├── hooks/
│   │   │   ├── contexts/
│   │   │   ├── providers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── firebase/
│   │   │   ├── utils/
│   │   │   ├── constants/
│   │   │   ├── schemas/
│   │   │   ├── types/
│   │   │   └── styles/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── docs/
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   ├── validation/
│   └── utils/
├── functions/
│   └── src/
├── firestore/
├── storage/
├── scripts/
├── .env.example
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
├── README.md
└── package.json
```
