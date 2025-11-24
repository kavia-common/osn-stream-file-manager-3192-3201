#!/bin/bash
cd /home/kavia/workspace/code-generation/osn-stream-file-manager-3192-3201/osn_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

