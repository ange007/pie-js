#!/bin/bash
# encoding: utf-8

if [ "$TRAVIS_BRANCH" != "master" &&  "$TRAVIS_BRANCH" != "dev" ] 
then 
	exit 0;
fi

DIST_PATH=${TRAVIS_BUILD_DIR}/actual-gh-pages
# переходим в директорию
cd ${TRAVIS_BUILD_DIR};
# копируем в неё репозиторий
git clone ${REPO_URL} actual-gh-pages;
# переходим в скопированный директорию репозитория, переключаемся в нужную ветку и чистим файлы
cd ${DIST_PATH} && git checkout gh-pages && rm -rf *;
# перемещаем файлы
cp -rp ${TRAVIS_BUILD_DIR}/build/* ${DIST_PATH};
cp -rp ${TRAVIS_BUILD_DIR}/README.md ${DIST_PATH};
cp -rp ${TRAVIS_BUILD_DIR}/CHANGELOG.md ${DIST_PATH};
cp -rp ${TRAVIS_BUILD_DIR}/LICENSE ${DIST_PATH};
# переходим в директорию добавляе коммит
cd ${DIST_PATH} && git add -A && git commit -am "Автоматическая сборка (${TRAVIS_BUILD_NUMBER})";
# отправляем коммит
git push ${REPO_URL} gh-pages;