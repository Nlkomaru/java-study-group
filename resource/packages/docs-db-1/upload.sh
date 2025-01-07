#!/usr/bin/sh

# 環境変数
PROJECT_NAME=$1

# ディレクトリとファイルのhash値を取得
TARGET_DIR=static/
DOCS_FILE=docs.md
SLIDES_FILE=slides.md

TEMP_DIR=temp
FILE_LIST=$TEMP_DIR/files.txt
HASH_LIST=$TEMP_DIR/hash_list.txt
FINAL_HASH=$TEMP_DIR/final_hash.txt

mkdir -p $TEMP_DIR

# ファイルリストを作成
find $TARGET_DIR -type f -print0 | sort -z > $FILE_LIST
printf "%s\0" "$SLIDES_FILE" >> $FILE_LIST
printf "%s\0" "$DOCS_FILE" >> $FILE_LIST

echo "FILE_LIST"
cat $FILE_LIST | tr '\0' '\n'

# 各ファイルのハッシュ値を計算
cat $FILE_LIST | xargs --null sha256sum | sort > $HASH_LIST

echo "HASH_LIST"
cat $HASH_LIST

# 全体のハッシュ値を計算
sha256sum $HASH_LIST | awk '{print $1}' > $FINAL_HASH

echo "FINAL_HASH"
cat $FINAL_HASH

#S3からhashfileを取得
aws s3 cp --endpoint-url $S3_ENDPOINT s3://$S3_UPLOAD_BUCKET/$PROJECT_NAME/hash.txt $TEMP_DIR/s3_hash.txt

# ハッシュ値が一致するか確認

if [ `cat $FINAL_HASH` = `cat $TEMP_DIR/s3_hash.txt` ]; then
  echo "一致しているため、終了します"
  exit 0
else
  echo "不一致"
  aws s3 rm s3://$S3_UPLOAD_BUCKET/$PROJECT_NAME --endpoint-url $S3_ENDPOINT --recursive
fi

# ハッシュ値をアップロード
echo `cat $FINAL_HASH` > $TEMP_DIR/hash.txt
aws s3 cp $TEMP_DIR/hash.txt --endpoint-url $S3_ENDPOINT s3://$S3_UPLOAD_BUCKET/$PROJECT_NAME/hash.txt

# すべて削除
rm -rf $TEMP_DIR

# ファイルをアップロード
pnpm run build
pnpm run screenshot
cp -r picture dist
cp -r static dist
cp docs.md dist
aws s3 cp dist --endpoint-url $S3_ENDPOINT s3://$S3_UPLOAD_BUCKET/$PROJECT_NAME --recursive

#終了

exit 0

