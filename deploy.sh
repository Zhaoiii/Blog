#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
rm -rf ./docs
npm run build
# mv  ./web/.vuepress/dist ./docs
git add .
git commit -m "deploy"
git push https://github.com/Zhaoiii/Blog.git
echo "deployed"
