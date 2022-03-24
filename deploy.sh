#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
npm run build
rm -rf ./docs
mv  ./web/.vuepress/dist ./docs
git add .
git commit -m "feat: deploy"
git push https://github.com/Zhaoiii/Blog.git
echo "deployed"
