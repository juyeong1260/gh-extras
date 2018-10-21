# gh-extras

깃헙의 정보를 확인하는 cli

## cli

### `gh-extras auth`

깃헙의 `username` 과 `password` 를 `~/.gh-extras/auth` 에 저장합니다.

### `gh-extras summary commit`

```
gh-extras summary commit -R [repo] -O [private-org] -S [2018-01-01] -U [2018-12-31] -s
```
- options
  - `-R || --repo [value]`
    - 커밋 정보를 불러올 레포지토리를 작성합니다.
  - `-O || --owner [value]`
    - 레포지토리의 `owner` 를 작성합니다. (`default - auth.username`)
  - `-S || --since [YYYY-MM-DD]`
    - 커밋을 불러오기 시작하는 날짜(`start-date`) 작성.
  - `-U || --until [YYYY-MM-DD]`
    - 불러오는 커밋의 마지막 날짜(`end-date`) 작성.
  - `-s || --save`
    - 커밋정보의 저장 여부
  