#!/bin/sh
BRANCH=$1
echo branch: ${BRANCH}
if [[ "$BRANCH" == "master" ]]; then
    latesttag=$(git describe --tags `git rev-list --tags --max-count=1`)
    echo checking out ${latesttag}
    git checkout ${latesttag}
fi
full_version=$(cat package.json | jq .version | tr -d '"')
echo found version: ${full_version}
IFS='.' read -r -a versions <<< "$full_version"
feature_version=${versions[0]}.${versions[1]}
major_version=${versions[0]}
echo found feature version: ${feature_version}
echo found major version: ${major_version}

if [[ "$BRANCH" == "master" ]]; then
    echo building release version
    docker pull corphub/corphub-frontend:latest || true
    docker build --cache-from corphub/corphub-frontend --build-arg POM_VERSION=${full_version} -t corphub/corphub-frontend:${full_version} -t corphub/corphub-frontend:${feature_version} -t corphub/corphub-frontend:${major_version} -t corphub/corphub-frontend:latest .
    docker push corphub/corphub-frontend
fi
if [[ "$BRANCH" == "dev" ]]; then
    echo building snapshot version
    docker pull corphub/corphub-frontend:snapshot|| true
    docker build --cache-from corphub/corphub-frontend --build-arg POM_VERSION=${full_version} -t corphub/corphub-frontend:snapshot .
    docker push corphub/corphub-frontend
fi
