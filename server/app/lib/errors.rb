module satouNext
  class Error < StandardError; end
  # 対象のリソースが存在しないことを示す
  class NotFoundError < Error; end
  # 対象のリソースに対してアクセスや編集をする権限がないことを示す
  class NotPermittedError < Error; end
  # リソースの状態に対して不適当な操作をしたことを示す
  class InvalidStatusError < Error; end
  class UserError < Error
    attr_accessor :code
    def initialize(msg, code = nil)
      super(msg)
      @code = code
    end
  end
  # ユーザーの入力に起因するエラーがあったことを示す
  class UserInputError < UserError
    def initialize(msg, code = nil)
      super(msg, code)
    end
  end
end
