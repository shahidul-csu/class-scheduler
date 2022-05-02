while true; do
  python3 algorithm.py 2> /dev/null
  ret=$?
  if [ $ret -eq 0 ]; then
    break
  fi
  echo "Retrying"
done
